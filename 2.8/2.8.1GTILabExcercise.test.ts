class Animals {
    name: string;
    sound: string;
    food: string;
    constructor(name: string, sound: string, food: string) {
      this.name = name;
      this.sound = sound;
      this.food = food;
    }
    soundOff(): string {
      return `${this.name} make the sound "${this.sound}".`;
    }
  }
  
  /**
  * Fish extends Animal, but takes different properties, has a different soundOff() method, and a new method, habitat().
  * 
  * 
  * @param {string} name - as expected
  * @param {string} food - as expected
  * @param {string} saltwater - true if the fish is a saltwater fish
  */

  class Fishes extends Animals {
    saltwater: boolean
    constructor(name: string, food: string, saltwater: boolean) {
    super(name, null, food);
    this.saltwater = saltwater;
    };
    soundOff(): string {
        return `${this.name} are fish and do not make sounds.`
    };
    habitat(): string {
        return `${this.name} are ${this.saltwater ? "saltwater" : "freshwater"} fish.`
    };
  };
  
  /**
  * Bird extends Animal, but takes an additional property, and has an additional method, fly().
  * @param {string} name - as expected
  * @param {string} sound - as expected
  * @param {string} food - as expected
  * @param {number} flightSpeed - the flight speed of the bird, in meters/second. This should be 0 for flightless birds.
  */
  
  class Birds extends Animals {
    flightSpeed: number
    constructor(name: string, sound: string, food: string, flightSpeed: number) {
        super(name, sound, food);
        this.flightSpeed = flightSpeed
    };
    fly(): string {
        if (this.flightSpeed > 0)
            return `${this.name} fly at speeds of up to ${this.flightSpeed} meters per second!`
        else 
            return `${this.name} are flightless birds.`
             
        };

    };
  

  describe("Testing animals", () => {
    test("a basic animal works as expected", () => {
      let lion = new Animals("Lions", "roar", "meat");
      // lion is an animal
      expect(lion instanceof Animals).toBeTruthy();
      // lion.soundOff() has the expected output
      expect(lion.soundOff()).toBe('Lions make the sound "roar".');
    });
    describe("Fish", () => {
      // Fish should only have the three parameters listed.
      let goldfish = new Fishes("Goldfish", "pellets", false);
      let sharks = new Fishes("Sharks", "fish", true);
      it("are animals", () => {
        // Fish *must* extend Animal
        expect(goldfish instanceof Animals).toBeTruthy();
      });
      it("doesn't make sound", () => {
        // Fish should give the expected soundOff, it's own version
        expect(goldfish.soundOff()).toBe(
          "Goldfish are fish and do not make sounds."
        );
      });
      it("can be saltwater or freshwater", () => {
        // Fish gives the right habitat string based on the `saltwater` property
        expect(goldfish.habitat()).toBe("Goldfish are freshwater fish.");
        expect(sharks.habitat()).toBe("Sharks are saltwater fish.");
      });
    });
    describe("Birds", () => {
      // Bird should actually take four arguments
      let swallows = new Birds("Swallows", "chattering chirp", "insects", 11);
      let emus = new Birds("Emus", "grunt", "plants and insects", 0);
      it("are animals", () => {
        // Bird *must* extend Animal
        expect(swallows instanceof Animals).toBeTruthy();
      });
      it("make sounds", () => {
        // Bird uses the standard soundOff
        expect(swallows.soundOff()).toBe(
          'Swallows make the sound "chattering chirp".'
        );
      });
      it("might be able to fly", () => {
        // Bird have a new method using the fly speed to give us these strings
        expect(swallows.fly()).toBe(
          "Swallows fly at speeds of up to 11 meters per second!"
        );
        expect(emus.fly()).toBe("Emus are flightless birds.");
      });
    });
  });