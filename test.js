const tasks = ["a", "a ", "a  "]

function uniq(text) {

    if (!(tasks.indexOf(text) === -1)) {
        const space = ' '
        for (let task of tasks) {
            if (task.trim() === text) {
                text += space;
            }
        }
    }


}