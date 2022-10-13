import { shallowMount, mount } from '@vue/test-utils'
import Counter from '@/components/Counter'
import { TestWatcher } from 'jest';

describe('Counter component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Counter)
    })
    // test('Debe de hacer match con el snapshot', () => {
    //     const wrapper = shallowMount(Counter)
    //     expect(wrapper.html()).toMatchSnapshot()
    // })

    test('h2 debe de tener el valor por defecto "Counter"', () =>{
        // const wrapper = shallowMount(Counter)
        //Evaluar que la etiqueta a la que queremos acceder tenga valor
        expect(wrapper.find('h2').exists()).toBeTruthy()
        const h2Tag = wrapper.find('h2')
        //Evaluar que el texto de la etiqueta corresponda
        expect(h2Tag.text()).toBe('Counter')
    })

    test('El valor por defecto debe de ser 100 en la tag p', async() => {
        //Wrapper
        // const wrapper = shallowMount(Counter)
        //p tags
        //const h2Tags = wrapper.findAll('p')
        const value = wrapper.find('[data-testid="counter"]').text()
        //Expect segundo p === 100
        //expect(h2Tags[1].text()).toBe('100')
        expect(value).toBe('100')
        const [increaseBtn, decreseBtn] = wrapper.findAll("button")
        await increaseBtn.trigger('click')
    })

    test('Debe de incrementar y decrementar el valor del contador', async() => {
        // const wrapper = shallowMount(Counter)

        const [increaseBtn, decreseBtn] = wrapper.findAll("button")
        //Simular el click incremento
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')

        //Simular click decremento
        await decreseBtn.trigger("click")
        await decreseBtn.trigger("click")

        const value = wrapper.find('[data-testid="counter"]').text()

        expect(value).toBe('100')
    })

    test('Debe de establecer el valor por defecto', () => {
        const {start} = wrapper.props()

        const value = wrapper.find('[data-testid="counter"]').text()

        expect(Number(value)).toBe(start)
    })

    test('Debe de mostrar la prop titulo', () => {
        const titulo = 'Hola mundo!!'

        const wrapper = shallowMount(Counter, {
            props: {
                titulo,
            }
        })

        expect(wrapper.find('h2').text()).toBe(titulo)
    })
})