module.exports = (db) => {

let username = ""

const setName =  async(name) =>{
    username = name.toLowerCase().trim()
      let counter = await db.oneOrNone("select count(*) from users where firstname = $1",
        [name]
      );
      if (counter.count ==0) {
        await db.none("insert into users(firstname) values($1)", [name]);
        
      } else if (counter.count > 0) {
        return;
      }
    }

    const namesList = async () => {
        let list = await db.manyOrNone("select distinct name from users")
        return list
    }
    
    const returnCategory = async () => {
        let categoryResult = await db.manyOrNone('select * from categories')
    
    return categoryResult
    }

    const setExpenses = async (userId, categoriesId, amount, date) => {
        let result = ''
        result = await db.oneOrNone(
            "insert into expenses (users_id, category_id, date, amount) values ($1, $2, $3, $4)", [userId, categoriesId, date, amount])
        return result
    }
    const returnExpenses = async (name) => {
        const joinedResults = await db.manyOrNone("select * from users join expenses on user_id = category join expenses on category_id = expenses.users_id where expenses.categories_id = $1", [name])
        return joinedResults
    }

    {
    
        setName,
        setExpenses,
        returnExpenses,
        returnCategory,
        namesList
    }
}
