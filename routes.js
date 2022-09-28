module.exports = (expenses) => {

    const home = (req, res) => {
        res.render('index');
    }

    const addExpenses = async (req, res) => {
        let name = req.body.userName;
        let category = req.body.category;
        let date = req.body.day;
        let amount = req.body.amount;

        await expenses.setName(name);

        let userId = await expenses.userId(name);
        let categoriesId = await expenses.categoryId(category);

        await expenses.setExpenses(userId, categoriesId, amount, date)
        res.redirect('back')
    }

    const getExpenses = async (req, res) => {
        let name = req.params.name;
        let data = await expenses.returnExpenses(name);
        res.render('expenses', {
            data
        })
    }

    const uniqueNames = async (req, res) => {
        let uniqueNames = await expenses.namesList()
        res.render('enteredExpenses', {
            uniqueNames
        })
    }

    return {
        home,
        addExpenses,
        getExpenses,
        uniqueNames
    }
}