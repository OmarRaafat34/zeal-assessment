import { ThreeDots } from "react-loader-spinner";
import { ZealLoaderProps } from "./types";

const ZealLoader = (props: ZealLoaderProps) => {
  return (
    <ThreeDots
      visible={true}
      height={props.height ?? "40"}
      width={props.width ?? "40"}
      color="#b1b9d3"
      radius="9"
    />
  );
};

export default ZealLoader;
