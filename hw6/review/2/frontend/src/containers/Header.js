import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import axios from "../api";
import { useScoreCard } from "../hooks/useScoreCard";

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    margin-left: 3em;
  }
`;

const Header = () => {
  const { addRegularMessage } = useScoreCard();

  const handleClear = async () => {
    console.log("frontend/src/Header handleClear");
    try {
      const {
        data: { msg },
      } = await axios.delete("/api/delete-db"); // TODO: axios.xxx call the right api
      console.log(msg);
      addRegularMessage(msg);
    } catch (error) {
      console.log("Error");
      console.log(error);
      if (!error.response) {
        console.log("Network Error");
      }
    }
  };

  return (
    <Wrapper>
      <Typography variant="h2">ScoreCard DB</Typography>
      <Button variant="contained" color="secondary" onClick={handleClear}>
        Clear
      </Button>
    </Wrapper>
  );
};

export default Header;
