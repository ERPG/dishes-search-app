module.exports = () => {
    describe('Search feature', () => {
        it('should render a search bar', async () => {
            expect(element(by.id('searchBar'))).toBeVisible();
        })
    })
}