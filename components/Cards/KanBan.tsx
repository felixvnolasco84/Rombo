"use client";
// import { List } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
// import CreateList from "./CreateList";
import {
  reorderList,
  updateDataOrderList,
  updateWholeBoard,
} from "@/services/list";
import ListItem from "./ListItem";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export interface List {
  id: string;
  title: string;
  requests: Doc<"requests">[];
}

interface ListProps {
  boardId?: string;
  list: List[];
}
// re order data
const reOrderData = (list: Doc<"requests">[], desIndex: number, sourceIndex: number) : Doc<"requests">[] => {
  const result = Array.from(list);
  const [removed] = result.splice(sourceIndex, 1);
  result.splice(desIndex, 0, removed);

  return result;
};

const KanBan = ({ list, boardId }: ListProps) => {
  const updateRequest = useMutation(api.requests.update);

  const orderUpdate = useMutation(api.requests.orderUpdate);

  const [listData, setListData] = useState(list);

  useEffect(() => {
    setListData(list);
  }, [list]);

  const onDragNDrop = (result: any) => {
    const { destination, source, type, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId == source.droppableId &&
      destination.index == source.index
    ) {
      return;
    }

    if (type == "card" && destination.droppableId !== source.droppableId) {
      const destinationList = listData.find(
        (item) => item.id === destination.droppableId
      );
      const sourceList = listData.find(
        (item) => item.id === source.droppableId
      );
      const card = sourceList?.requests.find(
        (item) => item._id === draggableId
      );

      if (card && destinationList && destinationList?.title !== card?.status) {
        const promise = updateRequest({
          id: card._id,
          status: destinationList.title,
        });

        toast.promise(promise, {
          loading: "Actualizando tarjeta...",
          success: "Tarjeta actualizada",
          error: "Error al actualizar la tarjeta",
        });
      }

      // card?.status = destinationList?.title;
      // card?.status = destinationList.id;
      // console.log(card);

      // const newRequests = destinationList.requests;

      // newRequests.splice(destination.index, 0, card);

      // const newSourceRequests = sourceList.requests.filter(
      //   (item: any) => item.id !== draggableId
      // );

      // const newSourceList = { ...sourceList, requests: newSourceRequests };

      // const newDestinationList = { ...destinationList, requests: newRequests };

      // const newLists = listData.map((item: any) => {
      //   if (item.id === destination.droppableId) {
      //     return newDestinationList;
      //   }
      //   if (item.id === source.droppableId) {
      //     return newSourceList;
      //   }
      //   return item;
      // });

      // setListData(newLists);

      // const response = await updateWholeBoard(newLists, boardId || "" );

      // if (!response.error) {
      //   toast({
      //     title: "Tablero Actualizado",
      //     description: "Se ha actualizado el orden de las tarjetas",
      //   });
      // }

      // if (response.error) {
      //   toast({
      //     title: "Error",
      //     description: "Ha ocurrido un error",
      //   });
      // }

      return;
    }

    if (type == "card" && destination.droppableId == source.droppableId) {
      const sourceList = listData.find(
        (item) => item.id === source.droppableId
      );

      const card = sourceList?.requests.find(
        (item) => item._id === draggableId
      );


      if (!card) return;


    // const response = Promise.all(listData) updateRequest({
    //   id: card._id,
    //   order: destination.index,
      
    // });

      const item = listData.find(
        (item: any) => item.id === destination.droppableId
      );

      if (!item) return;

      const data = reOrderData(
        // listData[destination.droppableId].cards,
        item.requests,
        destination.index,
        source.index
      // ).map((item: any, index: number) => ({ ...item, order: index }));
      ).map((item: any, index: number) => ({ _id: item._id, order: index }));

      const promise = orderUpdate({
        requests: data,
      });


      toast.promise(promise, {
        loading: "Actualizando orden...",
        success: "Orden actualizado",
        error: "Error al actualizar el orden",
      });

      // const listIndex = listData.findIndex(
      //   (list: any) => list.id == destination.droppableId
      // );



      // const list = listData[listIndex];
      // listData[listIndex] = { ...list, requests: data };


      // const response = await updateDataOrderList({
      //   listId: destination.droppableId,
      //   items: listData[listIndex].requests,
      // });

      // console.log(response);

      // setListData([...listData]);

      // if (!response.error) {
      //   toast({
      //     title: "Tablero Actualizado",
      //     description: "Se ha actualizado el orden de las tarjetas",
      //   });
      // }
    }

    // if (type == "list") {
    //   const data = reOrderData(listData, destination.index, source.index).map(
    //     (item: any, index: number) => ({ ...item, order: index })
    //   );
    //   setListData(data);
    //   // const response = await reorderList({
    //   //   items: data,
    //   //   boardId: listData[0].boardId,
    //   // });

    //   // if (!response.error) {
    //   //   toast({
    //   //     title: "Tablero Actualizado",
    //   //     description: "Se han reordenado las listas",
    //   //   });
    //   // }
    // }
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
            {listData?.map((list, index: number) => (
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
