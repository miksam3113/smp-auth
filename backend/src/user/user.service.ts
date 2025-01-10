import {
  ConflictException,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const isEmail = await this.usersRepository.findOneBy({
      email: dto.email,
    });

    if (isEmail) {
      throw new ConflictException('Email already in use').getResponse();
    }

    const isLogin = await this.usersRepository.findOneBy({
      username: dto.username,
    });

    if (isLogin) {
      throw new ConflictException('Username is already exists').getResponse();
    }

    const newUser = this.usersRepository.create({
      id: uuidv4(),
      first_name: dto.first_name,
      last_name: dto.last_name,
      username: dto.username,
      email: dto.email,
      password: await hash(dto.password, 10),
      created_at: new Date().toISOString(),
    });

    if (!newUser) {
      throw new NotImplementedException();
    }

    await this.usersRepository.save(newUser);

    return newUser;
  }

  async findByLogin(login: string) {
    return (
      (await this.usersRepository.findOneBy({ email: login })) ||
      (await this.usersRepository.findOneBy({ username: login }))
    );
  }

  async findById(id: string) {
    return await this.usersRepository.findOneBy({ id: id });
  }
}
