"use client";
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Flex, Spinner, Center, Select, IconButton, Text, CardFooter } from "@chakra-ui/react";
import Todo from "./Todo";
import { AddIcon, ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTodoStore } from "@/store/todoStore";
import getPriorityValue from "@/helpers/getPriorityValue";

export default function TodoContainer() {
  const router = useRouter();
  const { todos, setTodos, pendingTodos, completedTodos }: any = useTodoStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [filterState, setFilterState] = useState("pending");
  const [isHighTop, setIsHighTop] = useState(true);
  const [todoToShow, setTodoToShow] = useState([]);

  useEffect(() => {
    // if todos are already there, do not fetch again
    // if (todos.length > 1) return;
    getAllTodos();
  }, []);

  // change display todo based on filtering state
  useEffect(() => {
    if (filterState == "pending") return setTodoToShow(pendingTodos);
    if (filterState == "completed") return setTodoToShow(completedTodos);
  }, [filterState, pendingTodos, completedTodos]);

  // get all todo (can be modularized in controllers)
  const getAllTodos = async () => {
    setIsLoading(true);
    const { data } = await axios.get("/api/read");
    if (data.success == true) {
      setTodos(data.data);
      setTodoToShow(pendingTodos);
      setIsLoading(false);
    } else {
      console.log("issue");
    }
  };

  // change asc to dsc or vice-verca based on priority
  useEffect(() => {
    if (isHighTop) {
      const sortedData = [...todoToShow].sort((a: any, b: any) => getPriorityValue(a.priority) - getPriorityValue(b.priority));
      setTodoToShow(sortedData);
    } else {
      const sortedData = [...todoToShow].sort((a: any, b: any) => getPriorityValue(b.priority) - getPriorityValue(a.priority));
      setTodoToShow(sortedData);
    }
  }, [isHighTop]);

  return (
    <Card my={8} w={"sm"} maxW={"sm"} mx={4}>
      <CardHeader>
        <Flex justify={"space-between"} align={"center"}>
          <Heading onClick={() => console.log(todoToShow)} size="md">
            Todo List
          </Heading>
          <AddIcon onClick={() => router.push("/new")} className="icon-hover" />
        </Flex>
        <Flex gap={2} mt={2}>
          <IconButton size={"sm"} aria-label="filtering" onClick={() => setIsHighTop((isHighTop) => !isHighTop)} icon={isHighTop ? <ArrowDownIcon /> : <ArrowUpIcon />} />
          <Select onChange={(e) => setFilterState(e.target.value)} size={"sm"} className="capitalize">
            <option value={"pending"} className="capitalize">
              pending
            </option>
            <option value={"completed"} className="capitalize">
              completed
            </option>
          </Select>
        </Flex>
      </CardHeader>

      <CardBody>
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : todos.length > 1 ? (
          <Stack divider={<StackDivider />} spacing="4">
            {todoToShow.map((todo: any, i: number) => (
              <Todo {...todo} key={i} />
            ))}
          </Stack>
        ) : (
          "No todo"
        )}
      </CardBody>
      <CardFooter>
        <Text opacity={0.5} fontSize={"xs"} mx={"auto"}>
          Made by Ahmed Shams Wali
        </Text>
      </CardFooter>
    </Card>
  );
}
