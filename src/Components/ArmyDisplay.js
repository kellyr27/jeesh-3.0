import SoldierCone from "./SoldierCone";
import raycaster from "../Classes/Raycaster";
import gameState from "../Classes/Game/GameState";

export default function DisplayArmy({ colorScheme }) {

	const onClickHandler = (e) => {
		const soldierId = e.intersections[0].object.soldierId;
		const obj = e.intersections[0].object;

		raycaster.updateOnClick(soldierId, obj);

		e.stopPropagation();
	};

	const onPointerOverHandler = (e) => {
		const soldierId = e.intersections[0].object.soldierId;
		const obj = e.intersections[0].object;

		raycaster.updateOnPointerOver(soldierId, obj);

		e.stopPropagation();
	};

	const onPointerOutHandler = (e) => {
		raycaster.updateOnPointerOutHandler();

		e.stopPropagation();
	};

	return (
		<>
			<group
				onClick={onClickHandler}
				// onContextMenu={onContextMenuHandler}
				onPointerOver={onPointerOverHandler}
				onPointerOut={onPointerOutHandler}
			>
				{gameState.getStartingPoses(1).map((startingPose, index) => {
					return (
						<SoldierCone
							key={index}
							initialPosition={startingPose}
							soldierId={index}
							colorScheme={colorScheme}
							initialPose={startingPose}
						/>
					);
				})}
			</group>
		</>
	);
}