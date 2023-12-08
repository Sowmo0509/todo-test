"use client";
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Flex, useStatStyles } from "@chakra-ui/react";
import Todo from "./Todo";
import { AddIcon, CloseIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TodoContainer() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    const { data } = await axios.get("/api/read");
    if (data.success == true) {
      setTodos(data.data);
    }
  };

  return (
    <Card w={"sm"} maxW={"sm"} mx={"auto"}>
      <CardHeader>
        <Flex justify={"space-between"} align={"center"}>
          <Heading size="md">Todo List</Heading>
          <AddIcon onClick={() => router.push("/new")} className="icon-hover" />
        </Flex>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {todos.map((todo: any, i) => (
            <Todo {...todo} key={i} />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}
