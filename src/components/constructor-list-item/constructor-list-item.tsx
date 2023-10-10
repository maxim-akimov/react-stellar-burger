// Библиотеки
import { FC } from "react";
import { useDrag, useDrop } from "react-dnd";

// Хуки
import { useDispatch } from "../../services/hooks/useDispatch";

// Компоненты
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

// Стили
import styles from './constructor-list-item.module.css'

// Взаимодействие с хранилищем и сервером
import { deleteIngredientAction } from "../../services/actions/constructor";

// Типы
import { IDraggableIngredient } from "../../types/data";


export const ConstructorListItem: FC<IDraggableIngredient> = (props) => {
  const dispatch = useDispatch();

  const { uuid, name, image, price, findCard, moveCard } = props;
  const originalIndex = findCard(uuid).index


  const [{ orderingIsDragging }, orderingDragRef] = useDrag(
    () => ({
      type: 'ingredients-ordering',
      item: { uuid, originalIndex },
      collect: (monitor) => ({
        orderingIsDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { uuid: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveCard(droppedId, originalIndex)
        }
      },
    }),
    [uuid, originalIndex, moveCard],
  )
  const [, orderingDropRef] = useDrop(
    () => ({
      accept: 'ingredients-ordering',
      hover({ uuid: draggedId }: { uuid: string }) {
        if (draggedId !== uuid) {
          const { index: overIndex } = findCard(uuid)
          moveCard(draggedId, overIndex)
        }
      },
    }),
    [findCard, moveCard],
  )


  const opacityClass = orderingIsDragging ? styles.is_dragging : styles.default;


  const handleRemove = (uuid: string) => {
    dispatch(deleteIngredientAction(uuid));
  }


  return (
    <li key={uuid} className={`${styles.item} ${opacityClass}`}
        ref={(node) => orderingDragRef(orderingDropRef(node))}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => handleRemove(uuid)}
      />
    </li>
  );
}