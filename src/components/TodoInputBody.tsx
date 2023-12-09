"use client";
import { CardBody, Stack, StackDivider, Flex, Input, Textarea, Button, Select, Spinner, Center } from "@chakra-ui/react";
import React from "react";

export default function TodoInputBody(props: any) {
  return (
    <CardBody>
      <Stack divider={<StackDivider />} spacing="4">
        {props.isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <Flex gap={2} flexDir={"column"}>
            <Input name={"title"} value={props.value?.title} onChange={props.handleInput} fontSize={"sm"} placeholder="Todo Title" />
            <Textarea name={"desc"} value={props.value?.desc} onChange={props.handleInput} fontSize={"sm"} placeholder="Todo Description" />
            <Select name={"priority"} value={props.value?.priority} onChange={props.handleInput} fontSize={"sm"} placeholder={"Set priority"}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </Select>
            <Button isLoading={props.isLoading} onClick={props.handleSubmit} colorScheme={"blue"} size={"sm"} mt={2} fontSize={"sm"}>
              {props.onEdit ? "Edit" : "Add"} Todo
            </Button>
          </Flex>
        )}
      </Stack>
    </CardBody>
  );
}
