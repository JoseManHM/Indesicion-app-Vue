import { shallowMount, mount } from "@vue/test-utils";
import Indecision from '@/components/Indecision';

describe('Suite de pruebas del componente Indecision', () => {
    let wrapper;
    let consoleLogSpy;

    //Mock para el fetch API
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            answer: "yes",
            forced: false,
            image: "https://yesno.wtf/assets/yes/2.gif"
        })
    }))

    beforeEach( () => {
        wrapper = shallowMount(Indecision)

        consoleLogSpy = jest.spyOn(console, 'log')

        jest.clearAllMocks()
    })

    test('Debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Escribir en el input no debe de disparar nada (console.log)', async () => {
        //Spy en el componente
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

        const input =  wrapper.find('input')
        await input.setValue('Hola mundo')

        expect(consoleLogSpy).toHaveBeenCalledTimes(1)
        //expect(getAnswerSpy).toHaveReturnedTimes(0)
        expect(getAnswerSpy).not.toHaveBeenCalled()
        //console.log(wrapper.vm)
    })

    test('Escribir el simbolo ? debe de disparar el getAnswer', async() => {
        //Spy
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

        const input = wrapper.find('input')
        await input.setValue('?')

        expect(consoleLogSpy).toHaveBeenCalledTimes(1)
        expect(getAnswerSpy).toHaveBeenCalled()
    })

    test('Pruebas en getAnswer', async() => {
        await wrapper.vm.getAnswer()

        const img  = wrapper.find('img')
        expect(img.exists()).toBeTruthy()
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
        expect(wrapper.vm.respuesta).toBe('Sí!')
    })

    test('Pruebas en getAnswer - Fallo en el API', async() => {
        
        fetch.mockImplementationOnce(() => Promise.reject('API is down'))

        await wrapper.vm.getAnswer()

        const img = wrapper.find('img')

        expect(img.exists()).toBeFalsy()
        expect(wrapper.vm.respuesta).toBe('No se pudo cargar el API')
    })
})