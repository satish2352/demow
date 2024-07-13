import React from 'react';

export default function FlowSideBar({ nodes, edges }) {

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    function findChildren(nodeId, nodes, edges, visitedNodes = new Set()) {
        const currentNode = nodes.find(node => node.id === nodeId);

        if (!currentNode || visitedNodes.has(nodeId)) {
            return {};  // Return an empty object if currentNode is not found or node has been visited
        }

        visitedNodes.add(nodeId);

        const nodeObject = {
            // id: nodeId,  // Include id in nodeObject
            data: currentNode.data.label,
            // type: currentNode.type,
            children: []  // Initialize children as an empty array
        };

        const childEdges = edges.filter(edge => edge.source === nodeId);
        const childNodeIds = childEdges.map(edge => edge.target);

        for (const childId of childNodeIds) {
            const child = findChildren(childId, nodes, edges, visitedNodes);
            if (child !== null) {  // Check if child is not null
                nodeObject.children.push(child);
            }
        }

        return nodeObject;  // Return nodeObject directly
    }


    async function update() {
        const filtered_nodes = nodes.filter(node => node.type === "circle")
        let data = [];
        filtered_nodes.forEach((circleNode) => {
            const dict = findChildren(circleNode.id, nodes, edges)
            data.push(dict)
        })
        try {
            const res = await fetch('http://localhost:3002/flow/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: localStorage.getItem('jwt_token'), data,nodes, edges})
            })

            const msg = await res.json()
            if(msg.result){
                console.log("Updated")
            }else{
                console.log(msg.message)
            }
        } catch (e) {
            console.log("error while fetching")
        }

    }

    // function remove() { }

    return (
        <aside>
            <div>You can drag these nodes to the pane on the right.</div>
            <div onDragStart={(event) => onDragStart(event, 'circle')} draggable>
                Circle Node
            </div>
            <div onDragStart={(event) => onDragStart(event, 'rectangle')} draggable>
                Rectangle Node
            </div>
            <div onDragStart={(event) => onDragStart(event, 'triangle')} draggable>
                Triangle Node
            </div>
            <button onClick={update}>Update</button>
            {/* <button onClick={remove}>Update</button> */}
        </aside>
    );
};
