"use client";
import { Box, Heading, Text, Flex, Checkbox, Badge } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useTodoStore } from "@/store/todoStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Todo({ title, desc, status, priority, id }: any) {
  const router = useRouter();
  const { removeTodo, checkTodo, uncheckTodo }: any = useTodoStore((state) => state);

  const [isDone, setIsDone] = useState(status);

  const handleDelete = async (id: number) => {
    const { data } = await axios.delete(`/api/delete/?id=${id}`);
    if (data.success == true) return removeTodo(id);
    return window.alert("Problem when deleting a todo!");
  };

  const handleEdit = (id: any) => {
    return router.push(`/edit/${id}`);
  };

  const handleIsDone = async () => {
    setIsDone((status: boolean) => !status);
    const { data } = await axios.post(`/api/status/?id=${id}`, { done: !isDone });
    if (data.success == true) {
      if (isDone == true) {
        uncheckTodo(id, { id, title, desc, status: false, priority });
      } else {
        checkTodo(id, { id, title, desc, status: true, priority });
      }
      return;
    }
    return setIsDone((status: boolean) => !status);
  };

  return (
    <Box>
      <Flex justify={"space-between"} align={"center"}>
        <Flex gap={2}>
          <Checkbox isChecked={status} onChange={handleIsDone} />
          <Heading size="xs" textTransform="uppercase">
            {id} {title}
          </Heading>
          <Badge fontSize={"xx-small"}>{priority}</Badge>
        </Flex>
        <Flex gap={2}>
          <EditIcon onClick={() => handleEdit(id)} className="icon-hover" />
          <DeleteIcon onClick={() => handleDelete(id)} color={"red"} className="icon-hover" />
        </Flex>
      </Flex>
      <Text pt="2" fontSize="sm">
        {desc}
      </Text>
    </Box>
  );
}
