"use client";
import { CloseIcon } from "@chakra-ui/icons";
import { Card, CardHeader, Heading, CardBody, Stack, StackDivider, Flex, Input, Textarea, Button, Select } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { useTodoStore } from "@/store/todoStore";
import TodoInputBody from "@/components/TodoInputBody";

const NewTodo = () => {
  const router = useRouter();
  const { addTodo }: any = useTodoStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [todoInfo, setTodoInfo] = useState({
    title: "",
    desc: "",
    priority: "",
  });

  const handleInput = (e: any) => {
    setTodoInfo((todoInfo) => ({ ...todoInfo, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = async (e: any) => {
  //   setIsLoading(true);
  //   const { data } = await axios.post("/api/create", todoInfo);
  //   if (data.success == true) {
  //     addTodo(todoInfo);
  //     setIsLoading(false);
  //     return router.push("/");
  //   }
  // };
  const handleSubmit = () => {
    addTodo(todoInfo);
    return router.push("/");
  };

  return (
    <Card mx={4} w={"sm"} maxW={"sm"}>
      <CardHeader>
        <Flex justify={"space-between"} align={"center"}>
          <Heading size="md">New Todo</Heading>
          <CloseIcon onClick={() => router.back()} className="icon-hover" />
        </Flex>
      </CardHeader>

      <TodoInputBody isLoading={isLoading} handleInput={handleInput} handleSubmit={handleSubmit}></TodoInputBody>
    </Card>
  );
};

export default NewTodo;
