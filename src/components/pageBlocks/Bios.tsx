import { Bio as BioInterface } from "../../pages/About";
import React from "react";
import css from "../../styles/bio.module.css";
import { Content, Heading, TextBlock } from "../TextBlock";
import { Container } from "../Container";
import { Fade } from "react-reveal/Fade";
const Bios = ({ data }: { data: BioInterface[] }) => {
  return (
    <>
      {data.map((bio, i) => (
        <Container key={i}>
          <Bio key={i} data={bio} />
        </Container>
      ))}
    </>
  );
};
const Bio = ({ data }: { data: BioInterface }) => {
  return (
    <div className={css.container}>
      <img src={data.image} />
      <TextBlock noAnimation>
        <div className={css.tag + " " + css[data.tag]}>{data.tag}</div>
        <Heading>{data.name}</Heading>
        <Content>{data.description}</Content>
      </TextBlock>
      {/* <div>
        <div className={css.name}>{data.name}</div>
        <div className={css.description}>{data.description}</div>
      </div> */}
    </div>
  );
};
export default Bios;
