import React, { useRef } from "react";
import * as PIXI from "pixi.js";
import { useEffect } from "react";
import fit from "math-fit";

type ListCanvasType = {
  image: string;
  width: number;
  height: number;
};

const ListCanvas = ({ image, width, height }: ListCanvasType): JSX.Element => {
  const canvasList = useRef(null);

  let canvas: any;
  let app: any;
  let container: any;
  let displacementFilter: any;
  let displacementSprite: any;
  let containerImage: any;

  const initPixi = () => {
    canvas = canvasList.current;
    app = new PIXI.Application({
      width: width,
      height: height,
      backgroundColor: 0x171717,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
      clearBeforeRender: true,
    });

    canvas.appendChild(app.view);

    container = new PIXI.Container();
    app.stage.addChild(container);
  };

  const add = () => {
    const parent = {
      w: width,
      h: height,
    };

    containerImage = new PIXI.Container();
    containerImage.pivot.x = -width / 2;
    containerImage.pivot.y = -height / 2;

    let img = PIXI.Sprite.from(image);
    img.anchor.set(0.5);

    img.width = width;
    img.height = height;

    img.texture.orig.width = img.width;
    img.texture.orig.height = img.height;

    const target = {
      w: img.texture.orig.width,
      h: img.texture.orig.height,
    };

    img.position.set(img.texture.orig.width / 4, img.texture.orig.height / 4);

    const cover = fit(target, parent);

    img.position.set(cover.left, cover.top);
    img.scale.set(cover.scale, cover.scale);

    containerImage.addChild(img);
    container.addChild(containerImage);

    console.log(containerImage, "imgCanvas");
  };

  const filter = () => {
    displacementSprite = PIXI.Sprite.from("../images/displacement-smoke.jpg");

    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    displacementFilter = new PIXI.DisplacementFilter(displacementSprite);

    displacementFilter.scale.x = 40;
    displacementFilter.scale.y = 30;

    containerImage.filters = [displacementFilter];
    app.stage.addChild(displacementSprite);
  };

  const render = () => {
    app.ticker.add((delta: any) => {
      app.renderer.render(container);
      displacementSprite.x += 2 * delta;
      displacementSprite.y += 5;
    });
  };

  useEffect(() => {
    initPixi();
    add();
    filter();
    render();
  }, []);

  return <div ref={canvasList} className="list-reveal-img"></div>;
};

export default ListCanvas;
