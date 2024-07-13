import { Handle} from 'reactflow';
import './CustomNodes.css'
import { useState } from 'react';

export const RectangleNode = ({ data }) => {
    const [text, setText] = useState(data.label) 
    return (
        <div style={{ background: "#9ca8b3", padding: "14px" }}>
            <Handle
                type="target"
                position="left"
                id={`${data.id}.left`}
                style={{ borderRadius: 0 }}
            />
            <input id={data.id} type='text' value={text} onChange={(e)=>{data.label=e.target.value;setText(data.label)}}/>
            <Handle
                type="source"
                position="right"
                id={`${data.id}.right`}
                style={{ borderRadius: 0 }}
            />
        </div>
    );
};

export const CircleNode = ({ data }) => {
    const [text, setText] = useState(data.label) 

    return (
        <div
            style={{
                backgroundColor: "orange",
                padding: "24px",
                borderRadius: "70%"
            }}
        >
            <Handle
                type="target"
                position="left"
                id={`${data.id}.left`}
                style={{ borderRadius: "0" }}
            />
            <input id={data.id} type='text' value={text} onChange={(e)=>{data.label=e.target.value;setText(data.label)}}/>
            <Handle
                type="source"
                position="right"
                id={`${data.id}.right`}
                style={{ borderRadius: 0 }}
            />
        </div>
    );
};

export const TriangleNode = ({ data }) => {
    const [text, setText] = useState(data.label) 

    return (
        <div className="triangle-node">
            <Handle
                type="target"
                position="top"
                id={`${data.id}.top`}
                style={{ borderRadius: 0 }}
            />
            <input id={data.id} type='text' className='triangle-node-text' value={text} onChange={(e)=>{data.label=e.target.value;setText(data.label)}}/>

            {/* <Handle
                type="source"
                position="bottom"
                id={`${data.id}.bottom`}
                style={{ left: "50%", borderRadius: 0 }}
            /> */}
        </div>
    );
};

// export const TextNode = ({ data }) => {
//     return (
//         <div style={{ background: "transparent", padding: "14px" }}>
//             <div id={data.id}>{data.label}</div>
//         </div>
//     );
// };