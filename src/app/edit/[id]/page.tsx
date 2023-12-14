"use client";
import { CloseIcon } from "@chakra-ui/icons";
import { Card, CardHeader, Heading, Flex, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TodoInputBody from "@/components/TodoInputBody";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useTodoStore } from "@/store/todoStore";

const TodoEdit = ({ params }: any) => {
  const router = useRouter();
  const { todos, getTodo, singleTodo, editTodo }: any = useTodoStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [todoInfo, setTodoInfo] = useState({
    title: "",
    desc: "",
    priority: "",
  });

  useEffect(() => {
    getTodo(todos, params.id);
    setTodoInfo(singleTodo[0]);
  }, [params.id, singleTodo[0]]);

  const handleInput = (e: any) => {
    setTodoInfo((todoInfo) => ({ ...todoInfo, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = async (e: any) => {
  //   editTodo(params.id, todoInfo);
  //   setIsLoading(true);
  //   const { data } = await axios.post(`/api/edit/?id=${params.id}`, todoInfo);
  //   if (data.success == true) {
  //     setIsLoading(false);
  //     return router.push("/");
  //   }
  // };

  const handleSubmit = () => {
    editTodo(params.id, todoInfo);
    return router.push("/");
  };

  return (
    <Card mx={4} w={"sm"} maxW={"sm"}>
      <CardHeader>
        <Flex justify={"space-between"} align={"center"}>
          <Heading size="md">Edit Todo</Heading>
          <CloseIcon onClick={() => router.back()} className="icon-hover" />
        </Flex>
      </CardHeader>

      <TodoInputBody onEdit={true} value={todoInfo} isLoading={isLoading} handleInput={handleInput} handleSubmit={handleSubmit} />
    </Card>
  );
};

export default TodoEdit;
