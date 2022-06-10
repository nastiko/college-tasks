class Cart{

}



class Car{
    brand = 'Mazda';
    color = 'red';

    constructor(brand, color) {
        this.brand = brand;
        this.color = color;
    }

    getCarModel(){
        console.log(this.brand +' '+this.color);
    }
}

let car1 = new Car('Ferrari', 'white');
let car2 = new Car('Audi', 'black');

car1.getCarModel();
car2.getCarModel();

