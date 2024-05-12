export function GetRowsTabsHorizontal(array){
    const tabList = [];
    const statusTabList = [];
    
    array.map((row) => {
        let count = 0;
        const rowList = []
        row.map((cell) => {
            if(cell === "black"){
                count++;
            }
            else{
                rowList.push(count);
                count = 0;
            }
        })
        rowList.push(count);
        tabList.push(rowList.filter(num => num != 0));
    })

    tabList.map((row, index) => {
        statusTabList.push([]);
        row.map(cell => {
            statusTabList[index].push(false);
        })
    })
    return {tabList, statusTabList};
}

export function GetRowsTabsVertical(array){
    const tabList = [];
    const statusTabList = [];

    for(let i = 0; i < array[0].length; i++){
        let count = 0;
        const colList = [];

        for (let j = 0; j < array.length; j++){
            if(array[j][i] === "black"){
                count++;
            }
            else{
                colList.push(count);
                count = 0;
            }
        }
        colList.push(count);
        tabList.push(colList.filter(num => num != 0));
    }

    tabList.map((row, index) => {
        statusTabList.push([]);
        row.map(cell => {
            statusTabList[index].push(false);
        })
    })
    return {tabList, statusTabList};
}

