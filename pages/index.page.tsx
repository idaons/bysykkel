import type { NextPage } from "next";
import BysykkelListe from "../src/bysykkelListe/BysykkelListe";
import styled from "styled-components";

const StyledApp = styled.div`
  padding: 1rem;
`;

const StyledHeader = styled.h1`
  color: #fff;
  background-color: var(--bysykkel-color);
  padding: 1rem;
`;

export const headerId = "overskrift_id";

const Home: NextPage = () => {
  return (
    <main>
      <StyledHeader id={headerId}>Bysykler i Oslo</StyledHeader>
      <StyledApp>
        <BysykkelListe />
      </StyledApp>
    </main>
  );
};

export default Home;
