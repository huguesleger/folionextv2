import React from "react";
import { request } from "../lib/datocms/datocms";
import Query from "../lib/datocms/queries";
import { GraphQLResponse } from "../lib/datocms/types";
import SplittingWrapperWord from "../components/splitting/SplittingWrapperWord";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/layout/Footer";

const Contact: (props: { contact: GraphQLResponse.Contact }) => JSX.Element =
  (props: { contact: GraphQLResponse.Contact }) => {
    return (
      <div className="page-contact">
        <div className="container">
          <div className="wrap-content">
            <h1 className="title">
              <span className="title-1">
                <SplittingWrapperWord>
                  {props.contact.titre}
                </SplittingWrapperWord>
              </span>
              <span className="title-2">
                <SplittingWrapperWord>
                  {props.contact.titre2}
                </SplittingWrapperWord>
              </span>
            </h1>
            <div className="inner-email">
              <Link
                className="link-email"
                href={`mailto:${props.contact.email}`}
              >
                <span className="arrow">
                  <Image
                    src="/images/link-arrow-dark.svg"
                    layout="intrinsic"
                    width={24}
                    height={24}
                    alt="arrow"
                  />
                </span>
                <span className="email" data-cursor-label="Click">
                  {props.contact.email}
                </span>
              </Link>
            </div>
            <Footer type={"footer-dark"} />
          </div>
        </div>
      </div>
    );
  };

export default Contact;

export async function getStaticProps() {
  const res = (await request(
    Query.QUERY_CONTACT
  )) as GraphQLResponse.ContactPage;
  return {
    props: {
      contact: res.contact,
    },
  };
}
