import ServiceSteps from "./service-steps";

export default class Service {
  constructor(
    public title: string,
    public slug?: string,
    public description?: string,
    public steps?: ServiceSteps[]
  ) {}
}
