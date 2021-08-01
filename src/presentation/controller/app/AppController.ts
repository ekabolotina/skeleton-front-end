import { inject, injectable } from 'inversify';
import AppRepository from 'domain/repository/app/AppRepository';

@injectable()
export default class AppController {
    @inject(AppRepository)
    private readonly appRepository!: AppRepository;

    public get user() {
        return this.appRepository.getUser();
    }
}
