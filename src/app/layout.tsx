import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Flex, Text } from "@chakra-ui/react";
import { useTodoStore } from "@/store/todoStore";

export const metadata: Metadata = {
  title: "Todo Application",
  description: "Todo Application using Next 14, Prisma, SQL and TypeScript",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const { pendingTodos }: any = useTodoStore((state) => state);

  return (
    <html lang="en">
      <body>
        <Providers>
          {/* <Text fontSize={"xx-small"}>{JSON.stringify(pendingTodos)}</Text> */}
          <Flex justify={"center"} align={"center"} minH="100vh" bgGradient="linear(to-r, #1a0f8e, #1a004e)">
            {children}
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
