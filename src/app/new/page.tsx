"use client";
import { CloseIcon } from "@chakra-ui/icons";
import { Card, CardHeader, Heading, CardBody, Stack, StackDivider, Flex, Input, Textarea, Button, Select } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";

const NewTodo = () => {
  const router = useRouter();
  const [todoInfo, setTodoInfo] = useState({
    title: "",
    desc: "",
    priority: "",
  });

  const handleInput = (e: any) => {
    setTodoInfo((todoInfo) => ({ ...todoInfo, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    const { data } = await axios.post("/api/create", todoInfo);
    if (data.success == true) return router.push("/");
  };

  return (
    <Card w={"sm"} maxW={"sm"}>
      <CardHeader>
        <Flex justify={"space-between"} align={"center"}>
          <Heading size="md">New Todo</Heading>
          <CloseIcon onClick={() => router.back()} className="icon-hover" />
        </Flex>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Flex gap={2} flexDir={"column"}>
            <Input name={"title"} onChange={handleInput} fontSize={"sm"} placeholder="Todo Title" />
            <Textarea name={"desc"} onChange={handleInput} fontSize={"sm"} placeholder="Todo Description" />
            <Select name={"priority"} onChange={handleInput} fontSize={"sm"} placeholder={"Set priority"}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </Select>
            <Button onClick={handleSubmit} colorScheme={"blue"} size={"sm"} mt={2} fontSize={"sm"}>
              Add Todo
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NewTodo;
