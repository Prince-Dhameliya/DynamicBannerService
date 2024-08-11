const Banner = require("../models/banner");

const getBanners = async (req, res) => {
    try {
        const banners = await Banner.findAll();
        if (!banners) return res.status(404).json({ message: 'Banner not found' });
        
        const newBanners = banners.map((banner) => {
            const currentTime = new Date();
            const remainingTime = Math.max(0, new Date(banner.endTime) - currentTime);
            return {
                ...banner.dataValues,
                remainingTime,
                isVisible: banner.isVisible && remainingTime > 0,
            };
        });
    
        res.status(200).json(newBanners);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getBanner = async (req, res) => {
    const { id } = req.params;
    try {
        const banner = await Banner.findOne({ where: { id } });
        if (!banner) return res.status(404).json({ message: 'Banner not found' });
    
        const currentTime = new Date();
        const remainingTime = Math.max(0, new Date(banner.endTime) - currentTime);
    
        res.json({
            ...banner.dataValues,
          remainingTime: remainingTime, // Time in milliseconds
          isVisible: banner.isVisible && remainingTime > 0,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createBanner = async (req, res) => {
    try {
        await Banner.create(req.body);
        res.send('Banner created');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateBanner = async (req, res) => {
    const { id } = req.params;
    const { description, endTime, link, isVisible } = req.body;

    try {
        // Find the banner by ID
        const banner = await Banner.findByPk(id);

        if (!banner) {
        return res.status(404).json({ message: 'Banner not found' });
        }

        // Update the banner's details
        banner.description = description;
        banner.endTime = endTime;
        banner.link = link;
        banner.isVisible = isVisible;

        // Save the changes
        await banner.save();

        // Respond with the updated banner
        res.json(banner);
    } catch (error) {
        console.error('Error updating banner:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getBanners,
    updateBanner,
    createBanner,
    getBanner,
}