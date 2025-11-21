import { Spin } from "@douyinfe/semi-ui";

interface LoadingSpinnerProps {
  text?: string;
}

function LoadingSpinner({ text = "加载中..." }: LoadingSpinnerProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <Spin size="large" />
      <p className="text-white text-sm mt-4">{text}</p>
    </div>
  );
}

export default LoadingSpinner;
