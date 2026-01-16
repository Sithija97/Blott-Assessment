import "@testing-library/jest-dom/vitest";
import React from "react";
import type { ComponentProps } from "react";
import { vi } from "vitest";

vi.mock("next/image", () => {
  const Image = React.forwardRef<HTMLImageElement, ComponentProps<"img">>(
    (props, ref) => {
      // Filter out Next.js specific props that aren't valid HTML attributes
      const { fill, priority, ...imgProps } = props as any;
      return React.createElement("img", { ref, ...imgProps });
    }
  );
  Image.displayName = "NextImageMock";
  return { __esModule: true, default: Image };
});

vi.mock("next/link", () => {
  const Link = React.forwardRef<
    HTMLAnchorElement,
    ComponentProps<"a"> & { prefetch?: boolean }
  >((props, ref) => {
    const { href, children, ...rest } = props;
    return React.createElement(
      "a",
      { ref, href: href?.toString() ?? "", ...rest },
      children
    );
  });
  Link.displayName = "NextLinkMock";
  return { __esModule: true, default: Link };
});
