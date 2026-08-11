import {
  CircleCheckBig,
  CircleHelp,
  Info,
  TriangleAlert,
  X,
} from "lucide-react";
import { ExternalToast, toast } from "sonner";

export enum AlertType {
  ERROR = 0,
  INFO = 1,
  SUCCESS = 2,
  WARNING = 3,
  QUESTION = 4,
}

export const doAlert = (
  type: AlertType | null,
  message: string | null = null,
  header: string | null = null,
  duration: number | undefined = 2000,
) => {
  const config: ExternalToast & { header: React.ReactNode } = {
    header: <div className="px-3">{header ?? "Information"}</div>,
    closeButton: true,
    description: (
      <div className="text-black px-3">
        {type === 0 && message == null
          ? "Something went wrong, Please contact Administrator !"
          : message}
      </div>
    ),
    duration,
    icon: <Info />,
  };

  switch (type) {
    case 0:
      config.header = (
        <div className="px-3">{header ?? "Something went wrong !"}</div>
      );
      config.icon = <X className="text-destructive" />;
      break;
    case 1:
      config.header = <div className="px-3">{header ?? "Information !"}</div>;
      config.icon = <Info className="text-blue-500" />;
      break;
    case 2:
      config.header = <div className="px-3">{header ?? "Success !"}</div>;
      config.icon = <CircleCheckBig className="text-emerald-500" />;
      break;
    case 3:
      config.header = <div className="px-3">{header ?? "Warn !"}</div>;
      config.icon = <TriangleAlert className="text-yellow-500" />;
      break;
    case 4:
      config.header = <div className="px-3">{header ?? "Sorry !"}</div>;
      config.icon = <CircleHelp className="text-slate-500" />;
      break;
    default:
      break;
  }

  const { header: title, ...option } = config;

  return toast(title, option);
};
