import math
import numpy as np

def safe_json(value):
    """
    Recursively make any object JSON-safe
    """
    if isinstance(value, dict):
        return {k: safe_json(v) for k, v in value.items()}

    if isinstance(value, list):
        return [safe_json(v) for v in value]

    if isinstance(value, (np.integer,)):
        return int(value)

    if isinstance(value, (np.floating,)):
        if math.isnan(value) or math.isinf(value):
            return None
        return float(value)

    if isinstance(value, float):
        if math.isnan(value) or math.isinf(value):
            return None
        return value

    return value
