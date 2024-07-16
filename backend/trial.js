const arrayOfObjects = [
    {
        data: "Parent 1",
        children: [
            {
                data: "Child 1.1",
                children: [
                    {
                        data: "Child 1.1.1",
                        children: []
                    }
                ]
            },
            {
                data: "Child 1.2",
                children: []
            }
        ]
    },
    {
        data: "Parent 2",
        children: [
            {
                data: "Child 2.1",
                children: []
            }
        ]
    }
];

function findChildrenByData(text, array) {
    for (let obj of array) {
        if (obj.data === text) {
            return formatChildren(obj.children);
        }
        let result = findChildrenByData(text, obj.children);
        if (result) {
            return result;
        }
    }
    return null;
}

function formatChildren(children) {
    if (children.length === 0) return "No children";
    if (children.length === 1) return children[0].data;

    let formattedString = "";
    children.forEach((child, index) => {
        formattedString += `${index + 1}. ${child.data}\n`;
    });
    return formattedString.trim();
}

// Example usage:
const textToSearch = "Parent 2";
const result = findChildrenByData(textToSearch, arrayOfObjects);
console.log(result);
