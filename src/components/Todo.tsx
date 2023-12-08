"use client";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

export default function Todo({ title, desc }: any) {
  return (
    <Box>
      <Flex justify={"space-between"} align={"center"}>
        <Heading size="xs" textTransform="uppercase">
          {title}
        </Heading>
        <Flex gap={2}>
          <EditIcon className="icon-hover" />
          <DeleteIcon color={"red"} className="icon-hover" />
        </Flex>
      </Flex>
      <Text pt="2" fontSize="sm">
        {desc}
      </Text>
    </Box>
  );
}
