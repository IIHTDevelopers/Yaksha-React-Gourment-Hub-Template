const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../components/recipes/FavoriteRecipes.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('FavoriteRecipesComponent boundary should fetch favorite recipes for the user', () => {
        expect(fileContent).toMatch(/axios\.get\(`http:\/\/localhost:4000\/favorites\?userId=\$\{user\.id\}`\)/);
    });

    test('FavoriteRecipesComponent boundary should fetch payments made by the user', () => {
        expect(fileContent).toMatch(/axios\.get\(`http:\/\/localhost:4000\/payments\?userId=\$\{user\.id\}`\)/);
    });

    test('FavoriteRecipesComponent boundary should fetch all recipes', () => {
        expect(fileContent).toMatch(/axios\.get\('http:\/\/localhost:4000\/recipes'\)/);
    });

    test('FavoriteRecipesComponent boundary should contain loading state', () => {
        expect(fileContent).toMatch(/const \[loading, setLoading\] = useState\(true\);/);
    });

    test('FavoriteRecipesComponent boundary should contain payment success handler', () => {
        expect(fileContent).toMatch(/handlePaymentSuccess/);
    });

    test('FavoriteRecipesComponent boundary should display RecipeDetail for paid recipes', () => {
        expect(fileContent).toMatch(/paidRecipeIds\.includes\(recipe\.id\) \? \(\s*<RecipeDetail recipe=\{recipe\} \/>/);
    });

    test('FavoriteRecipesComponent boundary should display PaymentForm for unpaid recipes', () => {
        expect(fileContent).toMatch(/: \(\s*<PaymentForm recipe=\{recipe\} onSuccess=\{.*handlePaymentSuccess.*\} \/>/);
    });

    test('FavoriteRecipesComponent boundary should contain a list of favorite recipes', () => {
        expect(fileContent).toMatch(/<ul>\s*\{favoriteRecipes\.map\(.*recipe/);
    });
});
