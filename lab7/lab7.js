class Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }

    calculateSalary() {
        let salary = this.baseSalary;
        if (this.experience > 5) {
            salary = this.baseSalary * 1.2 + 500;
        } else if (this.experience > 2) {
            salary += 200;
        }
        return salary;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    getRole() {
        return "Employee";
    }
}

class Developer extends Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        super(firstName, lastName, baseSalary, experience);
    }

    getRole() {
        return "Developer";
    }
}

class Designer extends Employee {
    constructor(firstName, lastName, baseSalary, experience, efficiencyCoeff) {
        super(firstName, lastName, baseSalary, experience);
        this.efficiencyCoeff = efficiencyCoeff;
    }

    calculateSalary() {
        let salary = super.calculateSalary();
        return salary * this.efficiencyCoeff;
    }

    getRole() {
        return "Designer";
    }
}

class Manager extends Employee {
    constructor(firstName, lastName, baseSalary, experience, team = []) {
        super(firstName, lastName, baseSalary, experience);
        this.team = team;
    }

    calculateSalary() {
        let salary = super.calculateSalary();
        if (this.team.length > 10) {
            salary += 300;
        } else if (this.team.length > 5) {
            salary += 200;
        }

        const developers = this.team.filter(member => member instanceof Developer).length;
        if (developers > this.team.length / 2) {
            salary *= 1.1;
        }

        return salary;
    }

    getRole() {
        return "Manager";
    }
}

class Department {
    constructor(managers = []) {
        this.managers = managers;
    }

    giveSalary() {
        let output = '';
        this.managers.forEach(manager => {
            output += this.createEmployeeOutput(manager);
            manager.team.forEach(employee => {
                output += this.createEmployeeOutput(employee);
            });
        });
        document.getElementById('output').innerHTML = output;
    }

    createEmployeeOutput(employee) {
        return `
            <div class="employee">
                <span class="name">${employee.getFullName()}</span>
                <span class="role">(${employee.getRole()})</span>
                <span class="salary">отримав ${employee.calculateSalary().toFixed(2)} $</span>
            </div>
        `;
    }
}

// Example usage
const dev1 = new Developer('Ivan', 'Ivanov', 1000, 3);
const dev2 = new Developer('Petro', 'Petrov', 1200, 6);
const des1 = new Designer('Anna', 'Annova', 1100, 2, 0.9);
const des2 = new Designer('Olga', 'Olgova', 1300, 7, 0.8);

const manager1 = new Manager('Sergiy', 'Sergiyov', 1500, 10, [dev1, des1]);
const manager2 = new Manager('Andriy', 'Andriyov', 1600, 12, [dev2, des2, dev1]);

const department = new Department([manager1, manager2]);
department.giveSalary();

function updateExperience() {
    const experienceInput = document.getElementById('experience');
    const newExperience = parseInt(experienceInput.value, 10);
    
    if (!isNaN(newExperience)) {
        dev1.experience = newExperience;
        dev2.experience = newExperience;
        des1.experience = newExperience;
        des2.experience = newExperience;
        manager1.experience = newExperience;
        manager2.experience = newExperience;

        department.giveSalary();
    } else {
        alert('Будь ласка, введіть коректний досвід роботи (у роках).');
    }
}
