"use client";
import { CloseIcon } from "@chakra-ui/icons";
import { Card, CardHeader, Heading, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TodoInputBody from "@/components/TodoInputBody";
import { useRouter } from "next/navigation";
import axios from "axios";

const TodoEdit = ({ params }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [todoInfo, setTodoInfo] = useState({
    title: "",
    desc: "",
    priority: "",
  });

  useEffect(() => {
    getTodoData();
  }, [params.id]);

  const getTodoData = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`/api/read?id=${params.id}`);
    if (data.success == true) {
      setIsLoading(false);
      setTodoInfo({ title: data.data.title, desc: data.data.desc, priority: data.data.priority });
    }
  };

  const handleInput = (e: any) => {
    setTodoInfo((todoInfo) => ({ ...todoInfo, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    const { data } = await axios.post(`/api/edit/?id=${params.id}`, todoInfo);
    if (data.success == true) {
      setIsLoading(false);
      return router.push("/");
    }
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
