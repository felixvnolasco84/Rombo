"use client";
// import { List } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
// import CreateList from "./CreateList";
import { reorderList, updateDataOrderList } from "@/services/list";
import ListItem from "./ListItem";
import { toast } from "../ui/use-toast";

interface ListProps {
  // boardId: string;
  list: any;
}
// re order data
const reOrderData = (list: any, desIndex: number, sourceIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(desIndex, 0, removed);
  console.log(result);
  return result;
};




// const ListContainer = ({ boardId, list }: ListProps) => {
const KanBan = ({ list }: ListProps) => {
  const [listData, setListData] = useState(list);

  useEffect(() => {
    setListData(list);
  }, [list]);

  const onDragNDrop = async (result: any) => {
    const { destination, source, type, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId == source.droppableId &&
      destination.index == source.index
    ) {
      return;
    }

    if (type == "card" && destination.droppableId !== source.droppableId) {

      console.log(result)


              const destinationList = listData.find(
                (item: any) => item.id === destination.droppableId
              );
              console.log(destinationList);

              const sourceList = listData.find(
                (item: any) => item.id === source.droppableId
              );
              console.log(sourceList);

              const card = sourceList.requests.find(
                (item: any) => item.id === draggableId
              );

              card.status = destinationList.title;
              console.log(card);

              const newRequests = destinationList.requests;

              newRequests.splice(destination.index, 0, card);

              const newSourceRequests = sourceList.requests.filter(
                (item: any) => item.id !== draggableId
              );

              const newSourceList = { ...sourceList, requests: newSourceRequests };

              const newDestinationList = { ...destinationList, requests: newRequests };

              const newLists = listData.map((item: any) => {
                if (item.id === destination.droppableId) {
                  return newDestinationList;
                }
                if (item.id === source.droppableId) {
                  return newSourceList;
                }
                return item;
              });


              console.log(newLists);

              setListData(newLists);


              // const data = reOrderData(
              //   destinationList.requests,
              //   destination.index,
              //   source.index
              // ).map((item: any, index: number) => ({ ...item, order: index }));

              // const listIndex = listData.findIndex(
              //   (list: any) => list.id == destination.droppableId
              // );

              // const list = listData[listIndex];

              // listData[listIndex] = { ...list, requests: data };

              // const response = await updateDataOrderList({
              //   listId: destination.droppableId,
              //   items: listData[listIndex].requests,
              // });

              // setListData([...listData]);

              // if (!response.error) {
              //   toast({
              //     title: "Tablero Actualizado",
              //     description: "Se ha actualizado el orden de las tarjetas",
              //   });
              // }

              return;
    }
    
      if (type == "card" && destination.droppableId == source.droppableId) {
        console.log(destination.droppableId);

        console.log(listData);

        console.log(listData[destination.droppableId]);

        const item = listData.find(
          (item: any) => item.id === destination.droppableId
        );
        console.log(item);

        const data = reOrderData(
          // listData[destination.droppableId].cards,
          item.requests,
          destination.index,
          source.index
        ).map((item: any, index: number) => ({ ...item, order: index }));
        const listIndex = listData.findIndex(
          (list: any) => list.id == destination.droppableId
        );
        const list = listData[listIndex];
        listData[listIndex] = { ...list, requests: data };

        console.log(listData[listIndex]);
        const response = await updateDataOrderList({
          listId: destination.droppableId,
          items: listData[listIndex].requests,
        });

        console.log(response);

        setListData([...listData]);

        if (!response.error) {
          toast({
            title: "Tablero Actualizado",
            description: "Se ha actualizado el orden de las tarjetas",
          });
        }
      }

    if (type == "list") {
      const data = reOrderData(listData, destination.index, source.index).map(
        (item: any, index: number) => ({ ...item, order: index })
      );
      setListData(data);
      const response = await reorderList({
        items: data,
        boardId: listData[0].boardId,
      });

      if (!response.error) {
        toast({
          title: "Tablero Actualizado",
          description: "Se han reordenado las listas",
        });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragNDrop}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full w-full gap-x-3"
          >
            {listData?.map((list: any, index: number) => (
              <ListItem key={list.id} list={list} index={index} />
            ))}
            {provided.placeholder}
            {/* <CreateList boardId={boardId} /> */}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default KanBan;
