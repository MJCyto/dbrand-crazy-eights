const TitleBar = props => {
  return (
    <div style={{ backgroundColor: "red", height: 30, width: "100%" }}>DBrand Crazy Eights</div>
  );
};

const PageWrapper = ({ children }) => {
  return (
    <div style={{ height: "100vh" }}>
      <TitleBar />
      <div style={{ padding: 30, height: "calc(100% - 60px)" }}>{children}</div>
    </div>
  );
};

export default PageWrapper;
