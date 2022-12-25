import React from "react";
import {
  IconButton,
  Checkbox,
  Text,
  Box,
  VStack,
  HStack,
  Icon,
  Center,
  Heading,
  Stack,
  ScrollView,
} from "native-base";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/store";
import { ITask } from "../store/tasks/Task.types";
import { changeTaskStatus, removeTask } from "../store/tasks/Task.slice";
import { windowHeight } from "../utils/helpers/screen";
import { dateFormat } from "../utils/helpers/date-format";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../constants/Routes";

export default function TaskList() {
  const tasks = useAppSelector((state) => state.tasks.list);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const removeTaskById = (uuid: string) => {
    dispatch(removeTask(uuid));
  };

  const handleStatusChange = (task: ITask) => {
    dispatch(changeTaskStatus(task));
  };

  return (
    <Center w="100%">
      <Box style={styles.container} w="100%">
        <VStack space={4}>
          <ScrollView>
            <VStack space={2} minH={windowHeight}>
              {!tasks.length ? (
                <Heading
                  _light={{
                    color: "gray.400",
                  }}
                  _dark={{
                    color: "gray.350",
                  }}
                  size="md"
                  ml="2"
                  style={styles.emptyBox}
                >
                  События отсутствуют
                </Heading>
              ) : (
                tasks.map((task: ITask) => {
                  const uuid = task.uuid as string;
                  const isExpired = task.date < new Date();
                  return (
                    <TouchableOpacity
                      key={task.uuid as string}
                      onPress={() => {
                        navigation.navigate(ROUTES.MODAL, { task } as any);
                      }}
                    >
                      <Box key={task.uuid as string} alignItems="center">
                        <Box
                          minW={"100%"}
                          rounded="lg"
                          overflow="hidden"
                          borderColor="coolGray.200"
                          borderWidth="1"
                          _dark={{
                            borderColor: "coolGray.600",
                            backgroundColor: "gray.700",
                          }}
                          _light={{
                            backgroundColor:
                              isExpired || task.isCompleted
                                ? "red.50"
                                : "gray.50",
                          }}
                        >
                          <Stack p="4" space={3}>
                            <Stack
                              space={2}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              {isExpired ? (
                                <Icon
                                  as={FontAwesome}
                                  name="hourglass-o"
                                  size="md"
                                  color="red.400"
                                />
                              ) : (
                                <Checkbox
                                  isChecked={task.isCompleted}
                                  onChange={() => handleStatusChange(task)}
                                  value={task.title}
                                ></Checkbox>
                              )}
                              <Heading size="md" ml="2" style={{ flex: 1 }}>
                                {task.title}
                              </Heading>
                              <IconButton
                                size="sm"
                                colorScheme="trueGray"
                                icon={
                                  <Icon
                                    as={Entypo}
                                    name="trash"
                                    size="sm"
                                    color="trueGray.400"
                                  />
                                }
                                onPress={() => removeTaskById(uuid as string)}
                              />
                            </Stack>
                            {Boolean(task.description) && (
                              <Text fontWeight="400">{task.description}</Text>
                            )}
                            <HStack
                              alignItems="center"
                              space={4}
                              justifyContent="space-between"
                            >
                              <HStack alignItems="center">
                                <Text
                                  color="coolGray.600"
                                  _light={{
                                    color: "violet.500",
                                  }}
                                  _dark={{
                                    color: "violet.400",
                                  }}
                                  fontWeight="400"
                                >
                                  {dateFormat(task.date)}
                                </Text>
                              </HStack>
                            </HStack>
                          </Stack>
                        </Box>
                      </Box>
                    </TouchableOpacity>
                  );
                })
              )}
            </VStack>
          </ScrollView>
        </VStack>
      </Box>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  emptyBox: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    marginTop: 16,
    textAlign: "center",
  },
});
