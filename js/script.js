(function () {
    var E, g = window, n = document, p = function (a) {
        var b = g._gaUserPrefs;
        if (b && b.ioo && b.ioo() || (a && g["ga-disable-" + a])) return true;
        try {
            var c = g.external;
            if (c && c._gaUserPrefs && c._gaUserPrefs === "oo") return true;
        } catch (f) { }
        var a = [];
        var b = n.cookie.split(";");
        var c = /^\s*AMP_TOKEN=\s*(.*?)\s*$/;
        for (var d = 0; d < b.length; d++) {
            var e = b[d].match(c);
            if (e) a.push(e[1]);
        }
        for (var b = 0; b < a.length; b++) if (decodeURIComponent(a[b]) === "$OPT_OUT") return true;
        return false;
    };

    var q = function (a) {
        return encodeURIComponent ? encodeURIComponent(a).replace(/\(/g, "%28").replace(/\)/g, "%29") : a;
    };

    var r = /^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,
        u = /(^|\.)doubleclick\.net$/i;

    function randomNum() {
        return Math.round(2147483647 * Math.random());
    }

    function isFunction(a) {
        return typeof a === "function";
    }

    function isString(a) {
        return typeof a !== "undefined" && a.constructor.toString().includes("String");
    }

    function isUndefinedOrEmpty(a, b) {
        return typeof a === "undefined" || (a === "-" && !b) || a === "";
    }

    var nf = function () {
        this.prefix = "ga.";
        this.values = {};
    };

    nf.prototype.set = function (a, b) {
        this.values[this.prefix + a] = b;
    };

    nf.prototype.get = function (a) {
        return this.values[this.prefix + a];
    };

    nf.prototype.contains = function (a) {
        return typeof this.get(a) !== "undefined";
    };

    function parseUrl(a, includeAnchor) {
        var urlObject = {
            url: a,
            protocol: "http",
            host: "",
            path: "",
            R: new nf(),
            anchor: ""
        };

        if (!a) return urlObject;

        var protocolIndex = a.indexOf("://");
        if (protocolIndex >= 0) {
            urlObject.protocol = a.substring(0, protocolIndex);
            a = a.substring(protocolIndex + 3);
        }

        var pathStartIndex = a.search("/|\\?|#");
        if (pathStartIndex >= 0) {
            urlObject.host = a.substring(0, pathStartIndex).toLowerCase();
            a = a.substring(pathStartIndex);
        } else {
            urlObject.host = a.toLowerCase();
            return urlObject;
        }

        var anchorIndex = a.indexOf("#");
        if (anchorIndex >= 0) {
            urlObject.anchor = a.substring(anchorIndex + 1);
            a = a.substring(0, anchorIndex);
        }

        var queryIndex = a.indexOf("?");
        if (queryIndex >= 0) {
            urlObject.R = new nf();
            a = a.substring(0, queryIndex);
        }

        if (urlObject.anchor && includeAnchor) urlObject.R = new nf(urlObject.anchor);

        if (a.charAt(0) === "/") a = a.substring(1);

        urlObject.path = a;
        return urlObject;
    }

    function isAllowed(a, b) {
        function c(a) {
            var b = (a.hostname || "").split(":")[0].toLowerCase(),
                c = (a.protocol || "").toLowerCase();
            var d = c === "http:" ? 80 : c === "https:" ? 443 : "";
            var e = a.pathname || "";
            if (e.charAt(0) !== "/") e = "/" + e;
            return [b, "" + d, e];
        }

        b = b || n.createElement("a");
        b.href = n.location.href;

        var d = c(b),
            e = b.search || "",
            f = d[0] + (d[1] ? ":" + d[1] : "");

        if (a.startsWith("//")) a = d[2];
        else if (a.startsWith("/")) a = f + a;
        else a = a.split("/")[0].indexOf(":") < 0 ? f + "/" + a : a;

        b.href = a;
        d = c(b);

        return {
            protocol: b.protocol || "",
            host: d[0],
            port: d[1],
            path: d[2],
            query: b.search || "",
            url: a || ""
        };
    }

    document.addEventListener('DOMContentLoaded', () => {
        const images = [
            { category: 'Restaurant', src: 'bar_area.jpg', alt: 'Bar Area' },
            { category: 'Restaurant', src: 'bones_foodtruck.jpg', alt: 'Bones Foodtruck' },
            { category: 'Food', src: 'fries.jpg', alt: 'Fries' },
            { category: 'Patrons', src: 'two-patrons.jpg', alt: 'Two Patrons' },
            { category: 'Restaurant', src: 'inside_empty.jpg', alt: 'Inside Empty' },
            { category: 'Patrons', src: 'group_ribbon_opening.jpg', alt: 'Group Ribbon Opening' },
            { category: 'Restaurant', src: 'front_door_image.jpg', alt: 'Front Door' },
            { category: 'Restaurant', src: 'in_store_image.png', alt: 'In Store Image' },
            { category: 'Restaurant', src: 'behind the bar.jpg', alt: 'Behind the Bar' },
            { category: 'Restaurant', src: 'inside_seating.jpg', alt: 'Inside Seating' },
            { category: 'Restaurant', src: 'packed_restaurant.jpg', alt: 'Packed Restaurant' },
        ];

        const categories = ['Restaurant', 'Patrons', 'Food'];
        const galleryContainer = document.getElementById('gallery-container');

        categories.forEach(category => {
            const categorySection = document.createElement('div');
            categorySection.classList.add('category-section');

            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = category;
            categorySection.appendChild(categoryTitle);

            const carouselContainer = document.createElement('div');
            carouselContainer.classList.add('carousel-container');

            const track = document.createElement('div');
            track.classList.add('carousel-track');

            images
                .filter(image => image.category === category)
                .forEach(image => {
                    const slide = document.createElement('div');
                    slide.classList.add('carousel-slide');

                    const img = document.createElement('img');
                    img.src = `images/${image.src}`;
                    img.alt = image.alt;
                    slide.appendChild(img);

                    track.appendChild(slide);
                });

            carouselContainer.appendChild(track);

            const prevButton = document.createElement('button');
            prevButton.classList.add('carousel-button', 'carousel-button-left');
            prevButton.textContent = '<';

            const nextButton = document.createElement('button');
            nextButton.classList.add('carousel-button', 'carousel-button-right');
            nextButton.textContent = '>';

            carouselContainer.appendChild(prevButton);
            carouselContainer.appendChild(nextButton);

            categorySection.appendChild(carouselContainer);
            galleryContainer.appendChild(categorySection);

            let currentIndex = 0;

            const updateCarousel = () => {
                const slideWidth = track.children[0].getBoundingClientRect().width;
                track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            };

            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {

                    currentIndex--;
                    track.setAttribute('aria-live', 'polite');

                    updateCarousel();
                }
            });

            nextButton.addEventListener('click', () => {
                if (currentIndex < track.children.length - 1) {

                    currentIndex++;
                    track.setAttribute('aria-live', 'polite');

                    updateCarousel();
                }
            });

            window.addEventListener('resize', updateCarousel);
            updateCarousel();
        });
    });
})();