const Console = ({ data }) => {
    const groupedData = {};
    const totalRevenueByDay = {};
    const totalRevenueByNetwork = {};

    // Her ad network için aynı günü paylaşan tag'leri gruplayalım
    data.forEach(entry => {
        const { adNetwork, day, estimated_revenue, network_placement } = entry;
        const revenue = parseFloat(estimated_revenue);

        const key = `${adNetwork}_${day}`;

        if (!groupedData[key]) {
            groupedData[key] = {
                adNetwork,
                day,
                totalRevenue: 0,
                tags: [],
            };
        }

        groupedData[key].totalRevenue += revenue;
        groupedData[key].tags.push({ revenue: revenue.toFixed(2), network_placement });

        // Her gün için toplam geliri arttır
        if (!totalRevenueByDay[day]) {
            totalRevenueByDay[day] = 0;
        }
        totalRevenueByDay[day] += revenue;

        // Her ağ için toplam geliri arttır
        if (!totalRevenueByNetwork[adNetwork]) {
            totalRevenueByNetwork[adNetwork] = 0;
        }
        totalRevenueByNetwork[adNetwork] += revenue;
    });

    // Gruplanmış verileri aynı ad network'lere göre sıralayalım
    const sortedData = Object.values(groupedData).sort((a, b) => {
        if (a.adNetwork < b.adNetwork) return -1;
        if (a.adNetwork > b.adNetwork) return 1;
        return 0;
    });

    return (
        <div className="min-w-min flex flex-col items-center">
            <div className="mt-4">
                <h3 className="text-lg font-semibold">Toplam Gelirler:</h3>
                <ul>
                    {Object.entries(totalRevenueByDay).map(([day, totalRevenue], index) => (
                        <li key={index} className="text-sm">{day} - ${totalRevenue.toFixed(2)}</li>
                    ))}
                </ul>
            </div>
            <ul>
                {sortedData.map(({ adNetwork, day, totalRevenue, tags }, index) => {
                    // Her ad network için toplam geliri al
                    const networkTotalRevenue = totalRevenueByDay[day];

                    // Yüzdeyi hesapla
                    const percentage = (totalRevenue / networkTotalRevenue) * 100 || 0;

                    // Her ad network için tags array'indeki eleman sayısını bul
                    const numTags = tags.length;

                    return (
                        <li key={index} className={`mb-4 border p-4 ${getNetworkColor(adNetwork)}`}>
                            <strong className="text-md font-semibold text-lime-800">
                                {adNetwork} - {day}:</strong> ${totalRevenue.toFixed(2)} ({percentage.toFixed(2)}%) - {numTags}x
                            <ul className="list-disc list-inside mt-2">
                                {tags.map((tag, index) => (
                                    <li key={index} className="text-xs">{tag.network_placement} - ${tag.revenue}</li>
                                ))}
                            </ul>
                        </li>
                    );
                })}
            </ul>
        </div>

    );
};

// Diğer kodlar...


// Ad network renklerini belirlemek için yardımcı bir fonksiyon
const getNetworkColor = (adNetwork) => {
    const colors = {
        ADSYIELD: 'bg-sky-200',
        A4G: 'bg-lime-100',
        POTENSUS: 'bg-yellow-200',
        REKLAMUP: 'bg-red-200',
        PREMIUMADS: 'bg-purple-200',
        GRAVITE: 'bg-pink-200',
        // Diğer ad network renkleri ekleyebilirsiniz
    };

    return colors[adNetwork] || 'bg-gray-200'; // Tanımlı renk yoksa gri kullan
};

export default Console;
