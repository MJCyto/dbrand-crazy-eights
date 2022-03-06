import TitleBar from "./TitleBar";

const PageWrapper = ({ children }) => {
  return (
    <div style={{ height: "100vh" }}>
      <TitleBar />
      <div style={{ padding: "0 30px", height: "calc(100% - 31px)" }}>{children}</div>
    </div>
  );
};

export default PageWrapper;
