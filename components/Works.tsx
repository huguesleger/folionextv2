import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import fit from "math-fit";

const Work = ({ props }: any): JSX.Element => {
  // @ts-ignore
  const projets: [GraphQLResponse.Projet] = props && props.projets;

  const refCanvas = useRef<HTMLDivElement>(null);

  let app: any;
  let canvas: any;
  let container: any;
  let thumbs: any[];
  let direction: any;

  let width = window.innerWidth;
  let height = window.innerHeight;
  let scrollTarget = 0;
  let scroll = 0;
  let currentScroll = 0;
  let margin = 950;
  let wholeHeight = margin * projets.length;
  let aspect = 0.66;
  // let imageWidth = 800;
  let imageWidth = 500;
  let imageHeight = imageWidth / aspect;
  // let imageHeight = 1200;

  const initPixi = () => {
    canvas = refCanvas.current;
    app = new PIXI.Application({
      width: width,
      height: height,
      // backgroundColor: 0xffffff,
      backgroundColor: 0x171717,
      antialias: true,
    });

    canvas.appendChild(app.view);

    container = new PIXI.Container();
    app.stage.addChild(container);
  };

  const add = () => {
    thumbs = [];

    const parent = {
      w: imageWidth,
      h: imageHeight,
    };

    projets.forEach((img, i) => {
      let c = new PIXI.Container();
      let containerImage = new PIXI.Container();
      // c.pivot.x = -width / 2;
      c.pivot.x = -width / 3;
      c.pivot.y = -height / 2;

      let image = PIXI.Sprite.from(img.imageSlider.url);
      // image.width = imageWidth;
      // image.height = imageHeight;
      image.anchor.set(0.5);
      c.addChild(image);
      containerImage.addChild(c);

      image.texture.orig.width = img.imageSlider.width;
      image.texture.orig.height = img.imageSlider.height;

      const target = {
        w: image.texture.orig.width,
        h: image.texture.orig.height,
      };

      image.position.set(
        image.texture.orig.width / 4,
        image.texture.orig.height / 4
      );

      const cover = fit(target, parent);

      image.position.set(cover.left, cover.top);
      image.scale.set(cover.scale, cover.scale);

      let uniforms = {
        uPower: 0,
        uDir: 1,
        udisplacement: PIXI.Sprite.from("../images/displacement.png").texture,
        umap: image.texture,
        filterMatrix: new PIXI.Matrix(),
      };

      const vertex = `
      attribute vec2 aVertexPosition;

      uniform mat3 projectionMatrix;
      uniform mat3 filterMatrix;

      varying vec2 vTextureCoord;
      varying vec2 vFilterCoord;

      uniform vec4 inputSize;
      uniform vec4 outputFrame;

      vec4 filterVertexPosition( void )
      {
          vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

          return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
      }

      vec2 filterTextureCoord( void )
      {
          return aVertexPosition * (outputFrame.zw * inputSize.zw);
      }

      void main(void)
      {
          gl_Position = filterVertexPosition();
          vTextureCoord = filterTextureCoord();
          vFilterCoord = (filterMatrix * vec3(vTextureCoord, 1.0)).xy;
      }
      `;

      const fragment = `
        uniform mat3 projectionMatrix;
        uniform mat3 filterMatrix;
        
        varying vec2 vTextureCoord;
        varying vec2 vFilterCoord; 
        
        uniform vec4 inputSize;
        uniform vec4 outputFrame;
        uniform float uPower;
        uniform float uDir;
        
        uniform sampler2D udisplacement;
        uniform sampler2D umap;
        
        
        void main(void)
        {
        vec2 uv = vFilterCoord;
        vec4 disp = texture2D(udisplacement, uv);
        vec4 color = texture2D(umap, vec2(uv.x, uv.y - 0.2*disp.r * uDir * uPower));
        gl_FragColor = vec4(uv,0.,1.);
        gl_FragColor = color;
        }`;

      let displacementFilter = new PIXI.Filter(vertex, fragment, uniforms);

      displacementFilter.apply = function (filtermanager, input, output, e) {
        this.uniforms.filterMatrix = filtermanager.calculateSpriteMatrix(
          uniforms.filterMatrix,
          image
        );
        filtermanager.applyFilter(this, input, output, e);
      };

      image.filters = [displacementFilter];

      let mask = new PIXI.Graphics();

      c.addChild(mask);
      c.mask = mask;

      container.addChild(containerImage);

      thumbs.push({
        mask: mask,
        container: containerImage,
        image: image,
        uniforms: uniforms,
        position: i,
      });
    });
  };

  const updateAllTheThings = () => {
    thumbs.forEach((slide) => {
      slide.mask.clear();
      slide.mask.beginFill(0xff0000);
      // let mx = 260;
      // let my = 320;
      let mx = imageWidth - 250;
      let my = imageHeight - 450;
      let distortion = scroll * 5;
      let coef = 0.2;

      slide.uniforms.uDir = Math.sign(distortion);
      slide.uniforms.uPower = Math.abs(distortion * 0.01);

      let p = [
        {
          x: mx,
          y: -my,
        },
        {
          x: -mx,
          y: -my,
        },
        {
          x: -mx,
          y: my,
        },
        {
          x: mx,
          y: my,
        },
      ];

      if (distortion < 0) {
        p[2].x += Math.abs(distortion) * 0.4;
        p[2].y -= Math.abs(distortion) * 0.4;
        p[3].x -= Math.abs(distortion) * 0.4;
        p[3].y -= Math.abs(distortion) * 0.4;
      } else {
        p[0].x -= Math.abs(distortion) * 0.4;
        p[0].y += Math.abs(distortion) * 0.4;
        p[1].x += Math.abs(distortion) * 0.4;
        p[1].y += Math.abs(distortion) * 0.4;
      }

      let control = [
        {
          x: 0.5 * p[0].x + 0.5 * p[1].x,
          y: 0.5 * p[0].y + 0.5 * p[1].y + distortion,
        },
        {
          x: 0.5 * p[1].x + 0.5 * p[2].x + Math.abs(distortion * coef),
          y: 0.5 * p[1].y + 0.5 * p[2].y,
        },
        {
          x: 0.5 * p[2].x + 0.5 * p[3].x,
          y: 0.5 * p[2].y + 0.5 * p[3].y + distortion,
        },
        {
          x: 0.5 * p[3].x + 0.5 * p[0].x - Math.abs(distortion * coef),
          y: 0.5 * p[3].y + 0.5 * p[0].y,
        },
      ];

      slide.mask.moveTo(p[0].x, p[0].y);
      slide.mask.quadraticCurveTo(control[0].x, control[0].y, p[1].x, p[1].y);
      slide.mask.quadraticCurveTo(control[1].x, control[1].y, p[2].x, p[2].y);
      slide.mask.quadraticCurveTo(control[2].x, control[2].y, p[3].x, p[3].y);
      slide.mask.quadraticCurveTo(control[3].x, control[3].y, p[0].x, p[0].y);

      slide.container.position.y =
        ((slide.position * margin + currentScroll + 1000 * wholeHeight) %
          wholeHeight) -
        margin;
    });
  };

  const scrollEvent = () => {
    document.addEventListener("wheel", (e) => {
      scrollTarget = e.deltaY / 3;
    });
  };

  // let calcPos = (src: any, pos: any) => {
  //   let temp =
  //     ((src + pos + wholeHeight + imageHeight + margin) % wholeHeight) -
  //     imageHeight -
  //     margin;

  //   return temp;
  // };

  const render = () => {
    app.ticker.add(() => {
      app.renderer.render(container);
      updateAllTheThings();

      scroll -= (scroll - scrollTarget) * 0.1;
      scrollTarget *= 0.9;
      direction = Math.sign(scroll);
      currentScroll += scroll;

      // thumbs.forEach((th: any) => {
      //   // th.y = calcPos(scroll, th.y);
      //   th.y = scroll;
      // });
    });
  };

  useEffect(() => {
    initPixi();
    add();
    scrollEvent();
    render();
  }, []);

  return <div ref={refCanvas} className="works"></div>;
};

export default Work;
