import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Choloaki</title>
    </Helmet>
  );
};

export default PageTitle;
