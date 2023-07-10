import { jest } from '@jest/globals';

/**
 * Path to the module containing the repository to be tested.
 * @type {string}
 */
const repositoryRentsPath =
  '../../../app/modules/repository/rentsRepository.js';
/**
 * Path to the module containing the repository to be tested.
 * @type {string}
 */
const repositoryUserPath = '../../../app/modules/repository/userRepository.js';
/**
 * Path to the module containing the repository to be tested.
 * @type {string}
 */
const repositoryGamesPath =
  '../../../app/modules/repository/gamesRepository.js';
/**
 * Path to the module containing the repository to be tested.
 * @type {string}
 */
const repositoryRentingGamesPath =
  '../../../app/modules/repository/rentingGamesRepository.js';

/**
 * Path to the module containing the service to be tested.
 * @type {string}
 */
const servicePath = '../../../app/modules/services/rentsService.js';
/**
 * Mocks the repository module.
 */

jest.unstable_mockModule(repositoryRentsPath, () => ({
  RentRepository: {
    findOne: jest.fn(),
    findOneById: jest.fn(),
    findOneByIdAndOwnerId: jest.fn(),
    findOneByIdAndRenterId: jest.fn(),
    findAndCountAllByOwner: jest.fn(),
    findAndCountAllByRenter: jest.fn(),
    create: jest.fn(),
    updateStatus: jest.fn(),
    deleteById: jest.fn(),
  },
}));

jest.unstable_mockModule(repositoryGamesPath, () => ({
  GamesRepository: {
    findGameById: jest.fn(),
  },
}));

jest.unstable_mockModule(repositoryRentingGamesPath, () => ({
  RentingGamesRepository: {
    findOne: jest.fn(),
  },
}));

jest.unstable_mockModule(repositoryUserPath, () => ({
  UserRepository: {
    findUserById: jest.fn(),
  },
}));

/**
 * The mocked repository module.
 * @type {{RentRepository: {
 * findOne: Function,
 * findOneById: Function,
 * findOneByIdAndOwnerId: Function,
 * findOneByIdAndRenterId: Function,
 * findAndCountAllByOwner: Function,
 * findAndCountAllByRenter: Function,
 * create: Function,
 * updateStatus: Function,
 * deleteById: Function,
 * }}}
 */
const mockRepositoryRents = await import(repositoryUserPath);

/**
 * The mocked repository module.
 * @type {{UserRepository: {
 * findUserById: Function,
 * }}}
 */
const { UserRepository } = await import(repositoryUserPath);
/**
 * The mocked repository module.
 * @type {{GamesRepository: {
 * findGameById: Function,
 * }}}
 */
const { GamesRepository } = await import(repositoryGamesPath);
/**
 * The mocked repository module.
 * @type {{RentingGamesRepository: {
 * findOne: Function,
 * }}}
 */
const { RentingGamesRepository } = await import(repositoryRentingGamesPath);

/**
 * The mocked repository module.
 * @type {{
 * RentsService: {
 * getRentsByOwnerId: Function,
 * getRentsByRenterId: Function,
 * createRent: Function,
 * updateRentStatus: Function,
 * deleteRentByOwner: Function,
 * deleteRentByRenter: Function,
 *}}}
 */
const { RentService } = await import(servicePath);

describe('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  //placeholder pour demain
  it('placeholder pour demain', () => {
    expect(1).toBe(1);
  });
});
