import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, createElement } from "react";

export interface ActionButton {
  url: string;
  icon?: LucideIcon;
  title: string;
  tooltip?: string;
  variant?: "default" | "destructive" | "ghost" | "outline";
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";
  className?: string;
}

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface PageHeaderProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionButtons?: ActionButton[];
  breadcrumbs?: BreadcrumbItem[];
}

const PageHeader = (props: PageHeaderProps) => {
  const { title, description, actionButtons, breadcrumbs, icon } = props;

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="/dashboard"
            className="hover:text-primary dark:hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <Fragment key={index}>
              <span className="text-gray-400">/</span>
              {crumb.url ? (
                <Link
                  href={crumb.url}
                  className="hover:text-primary dark:hover:text-primary transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-gray-900 dark:text-white">
                  {crumb.label}
                </span>
              )}
            </Fragment>
          ))}
        </nav>
      )}

      {/* Title Section */}
      <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-y-2 gap-x-1">
        <div className="flex-auto flex flex-col gap-2">
          <div className="inline-flex gap-3 items-center justify-start">
            {icon &&
              createElement(icon, {
                className: "shrink-0 size-5 sm:size-6 md:size-6",
              })}

            <div className="flex-auto flex flex-col gap-1">
              <h1 className="font-medium text-lg sm:text-xl md:text-xl">
                {title}
              </h1>
              {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {actionButtons && actionButtons.length > 0 && (
          <div className="w-full sm:w-auto flex flex-row items-center justify-end self-center gap-1">
            {actionButtons.map((button, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link href={button.url}>
                    <Button
                      size={button.size ?? "default"}
                      className={cn(
                        "inline-flex items-center justify-center rounded-sm px-3 gap-2",
                        button.className,
                      )}
                      variant={button.variant ?? "default"}
                    >
                      {button.icon &&
                        createElement(button.icon, {
                          className: "shrink-0 size-3.5",
                        })}
                      <div className="block">{button.title}</div>
                    </Button>
                  </Link>
                </TooltipTrigger>
                {button.tooltip && (
                  <TooltipContent className="me-2">
                    <p className="max-w-52 lg:max-w-full flex-wrap text-wrap whitespace-pre-wrap p-0">
                      {button.tooltip}
                    </p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>
        )}
      </div>

      <hr className="hidden sm:block w-full border-t-2" />
    </div>
  );
};

export default PageHeader;
