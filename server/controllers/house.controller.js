import House from '../models/house.model.js';
import { errorHandler } from '../utils/error.js';

export const createHouse = async (req, res, next) => {
  try {
    const house = await House.create(req.body);
    return res.status(201).json(house);
  } catch (error) {
    next(error);
  }
};

export const deleteHouse = async (req, res, next) => {
  const house = await House.findById(req.params.id);

  if (!house) {
    return next(errorHandler(404, 'House not found!'));
  }

  if (req.user.id !== house.userRef) {
    return next(errorHandler(401, 'You can only delete your own Property!'));
  }

  try {
    await House.findByIdAndDelete(req.params.id);
    res.status(200).json('House has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateHouse = async (req, res, next) => {
  const house = await House.findById(req.params.id);
  if (!house) {
    return next(errorHandler(404, 'House not found!'));
  }
  if (req.user.id !== house.userRef) {
    return next(errorHandler(401, 'You can only update your own House!'));
  }

  try {
    const updatedHouse = await House.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedHouse);
  } catch (error) {
    next(error);
  }
};

export const getHouse = async (req, res, next) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) {
      return next(errorHandler(404, 'House not found!'));
    }
    res.status(200).json(house);
  } catch (error) {
    next(error);
  }
};

export const getHouses = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const houses = await House.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(houses);
  } catch (error) {
    next(error);
  }
};
