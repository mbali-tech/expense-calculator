module.exports = (expenses) => {

    const home = (req, res) => {
        res.render('index');
    }

    const addExpenses = async (req, res) => {
        let name = req.params;
        let category = req.body;
        let date = req.body;
        let amount = req.body;

        await expenses.setName(name);

        let userId = await expenses.userId(name);
        let categoriesId = await expenses.categoryId(category);

        await expenses.setExpenses(userId, categoriesId, amount, date)
    }

    const uniqueNames = async (req, res) => {
        let uniqueNames = await expenses.nameList()
        res.render('enteredExpenses', {
            uniqueNames
        })
    }

    return {
        home,
        addExpenses,
        uniqueNames
    }
}