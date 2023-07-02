import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";

import styles from './constructor-list-item.module.css'

import {DragIcon, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

import {DELETE_FROM_CONSTRUCTOR} from "../../services/actions/burger-constructor";



function ConstructorListItem(props) {
  const {uuid, name, image, price, findCard, moveCard} = props;

  const dispatch = useDispatch();


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
      hover({ uuid: draggedId }) {
        if (draggedId !== uuid) {
          const { index: overIndex } = findCard(uuid)
          moveCard(draggedId, overIndex)
        }
      },
    }),
    [findCard, moveCard],
  )
  const opacity = orderingIsDragging ? 0 : 1


  const handleRemove = (uuid) => {
    dispatch({
      type: DELETE_FROM_CONSTRUCTOR,
      uuid: uuid
    });
  }


  return (
    <li key={uuid} className={styles.item}
        ref={(node) => orderingDragRef(orderingDropRef(node))} style={{ opacity }}>
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


ConstructorListItem.propTypes = {
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  findCard: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
};


export default ConstructorListItem;