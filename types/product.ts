export interface Product {
    position:                   number;
    sponsored:                  boolean;
    is_prime:                   boolean;
    is_amazon_brand:            boolean;
    is_exclusive_to_amazon:     boolean;
    is_small_business:          boolean;
    kindle_unlimited:           boolean;
    is_amazon_fresh:            boolean;
    is_whole_foods_market:      boolean;
    is_climate_pledge_friendly: boolean;
    is_carousel:                boolean;
    product_id:                 string;
    thumbnail:                  string;
    title:                      string;
    sponsored_text:             string;
    link:                       string;
    price:                      Price;
    currency:                   string;
    amazon_choice:              AmazonChoice;
    shipping_details:           string[];
}

export interface AmazonChoice {
    keywords: string;
}

export interface Price {
    symbol:   string;
    value:    number;
    currency: string;
    raw:      string;
}
